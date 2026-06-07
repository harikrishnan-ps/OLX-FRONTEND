import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { MediaService } from '../../core/services/media.service';
import { LocationPicker } from '../../shared/location-picker/location-picker';
import { ImageUpload } from '../../shared/image-upload/image-upload';
import { switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-post-an-ad',
  imports: [CommonModule, ReactiveFormsModule, LocationPicker, ImageUpload],
  templateUrl: './post-an-ad.html',
  styleUrl: './post-an-ad.scss',
})
export class PostAnAd implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
  mediaService = inject(MediaService);

  adForm!: FormGroup;
  selectedFiles: File[] = [];
  selectedStateId: number | null = null;
  selectedCityId: number | null = null;

  ngOnInit(): void {
    this.adForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(4096)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onImagesChange(files: File[]): void {
    this.selectedFiles = files;
  }

  onLocationChange(loc: { stateId: number, cityId: number }): void {
    this.selectedStateId = loc.stateId;
    this.selectedCityId = loc.cityId;
  }

  isSubmitting = false;

  onSubmit(): void {
    if (this.adForm.valid && this.selectedCityId && this.selectedFiles.length > 0) {
      this.isSubmitting = true;
      const basePayload = {
        title: this.adForm.value.title,
        description: this.adForm.value.description,
        price: Number(this.adForm.value.price),
        categoryId: parseInt(this.adForm.value.category, 10),
        cityId: this.selectedCityId,
        isNegotiable: false,
        condition: 'Used',
        status: 'Draft'
      };

      // 1. Create listing as Draft
      this.productsService.createProduct(basePayload).pipe(
        switchMap((product) => {
          // 2. Upload images (only if files are selected)
          if (this.selectedFiles.length > 0) {
            return this.mediaService.uploadListingMedia(product.id, this.selectedFiles).pipe(
              switchMap(() => {
                // 3. Publish the listing by setting it to Active
                const activePayload = { ...basePayload, status: 'Active' };
                return this.productsService.updateProduct(product.id, activePayload);
              })
            );
          } else {
            // 3. Publish directly
            const activePayload = { ...basePayload, status: 'Active' };
            return this.productsService.updateProduct(product.id, activePayload);
          }
        }),
        finalize(() => this.isSubmitting = false)
      ).subscribe({
        next: () => {
          alert('Your ad was posted successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error posting ad', err, err.error);
          alert(`There was an error posting your ad: ${err.error?.message || err.error || err.message}`);
        }
      });
    } else {
      this.adForm.markAllAsTouched();
      if (!this.selectedCityId) alert('Please select a location');
      if (this.selectedFiles.length === 0) alert('Please upload at least one image');
    }
  }
}
