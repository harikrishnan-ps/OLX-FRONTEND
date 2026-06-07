import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../core/services/media.service';

@Component({
  selector: 'app-image-upload',
  imports: [CommonModule],
  template: `
    <div class="image-upload-container">
      <div class="upload-zone" (click)="fileInput.click()" [class.uploading]="isUploading">
        <span class="material-symbols-outlined">add_photo_alternate</span>
        <p>{{ isUploading ? 'Uploading...' : 'Click to add photos' }}</p>
      </div>
      <input #fileInput type="file" multiple accept="image/*" style="display: none;" (change)="onFileSelected($event)">
      
      <div class="preview-list" *ngIf="previewUrls.length > 0">
        <div class="preview-item" *ngFor="let url of previewUrls; let i = index">
          <img [src]="url" alt="Preview">
          <button type="button" class="remove-btn" (click)="removeImage(i)">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-upload-container { display: flex; flex-direction: column; gap: 16px; }
    .upload-zone {
      border: 2px dashed var(--color-outline);
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--color-outline);
    }
    .upload-zone:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .upload-zone.uploading { opacity: 0.5; pointer-events: none; }
    .upload-zone .material-symbols-outlined { font-size: 48px; margin-bottom: 8px; }
    .preview-list { display: flex; flex-wrap: wrap; gap: 16px; }
    .preview-item { position: relative; width: 100px; height: 100px; border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border); }
    .preview-item img { width: 100%; height: 100%; object-fit: cover; }
    .remove-btn {
      position: absolute; top: 4px; right: 4px;
      background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%;
      width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
      cursor: pointer;
    }
    .remove-btn span { font-size: 16px; }
  `]
})
export class ImageUpload {
  @Output() filesChange = new EventEmitter<File[]>();
  
  isUploading = false;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const newFiles = Array.from(files);
      
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      
      // Create local preview URLs
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      this.previewUrls = [...this.previewUrls, ...newUrls];
      
      this.filesChange.emit(this.selectedFiles);
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    
    // Revoke object URL to prevent memory leaks
    if (this.previewUrls[index]) {
      URL.revokeObjectURL(this.previewUrls[index]);
    }
    
    this.previewUrls.splice(index, 1);
    this.filesChange.emit(this.selectedFiles);
  }
}
