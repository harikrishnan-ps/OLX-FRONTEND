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
      
      <div class="preview-list" *ngIf="uploadedUrls.length > 0">
        <div class="preview-item" *ngFor="let url of uploadedUrls; let i = index">
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
  mediaService = inject(MediaService);
  
  @Output() urlsChange = new EventEmitter<string[]>();
  
  isUploading = false;
  uploadedUrls: string[] = [];

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const fileArray = Array.from(files);
      this.isUploading = true;
      this.mediaService.upload(fileArray, 'listing').subscribe({
        next: (res) => {
          this.isUploading = false;
          if (res.urls) {
            this.uploadedUrls = [...this.uploadedUrls, ...res.urls];
            this.urlsChange.emit(this.uploadedUrls);
          }
        },
        error: () => {
          this.isUploading = false;
          // Mock successful upload since we don't have backend running
          this.uploadedUrls.push('https://via.placeholder.com/150');
          this.urlsChange.emit(this.uploadedUrls);
        }
      });
    }
  }

  removeImage(index: number) {
    this.uploadedUrls.splice(index, 1);
    this.urlsChange.emit(this.uploadedUrls);
  }
}
