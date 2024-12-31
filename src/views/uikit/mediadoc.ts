import { Product } from '@/src/app/demo/api/product';
import { PhotoService } from '@/src/app/demo/service/photo.service';
import { ProductService } from '@/src/app/demo/service/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
    standalone:true,
    imports:[CommonModule, CarouselModule,ButtonModule,GalleriaModule, ImageModule, TagModule],
    template: `<div class="grid p-fluid">
    <div class="col-12">
        <div class="card">
            <h5>Carousel</h5>
            <p-carousel [value]="products" [numVisible]="3" [numScroll]="3" [circular]="false" [responsiveOptions]="carouselResponsiveOptions">
    <ng-template let-product #item>
        <div class="border border-surface rounded-border m-2 p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                <img src="assets/demo/images/product/{{product.image}}" [alt]="product.name" class="shadow-4" width="50%"/>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute" styleClass="dark:!bg-surface-900" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                </div>
            </div>
            <div class="mb-4 font-medium">{{ product.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                <span>
                    <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                    <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                </span>
            </div>
        </div>
    </ng-template>
</p-carousel>
        </div>
    </div>

    <div class="col-12">
        <div class="card">
            <h5>Image</h5>
            <div class="flex justify-content-center">
                <p-image src="assets/demo/images/galleria/galleria10.jpg" alt="Image" width="250" [preview]="true"></p-image>
            </div>
        </div>
    </div>

    <div class="col-12">
        <div class="card">
            <h5>Galleria</h5>
<p-galleria [value]="images" [responsiveOptions]="galleriaResponsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" style="width:100%" />
    </ng-template>
    <ng-template #thumbnail let-item>
        <img [src]="item.thumbnailImageSrc" />
    </ng-template>
</p-galleria>
        </div>
    </div>
</div>`,
})
export class MediaDoc implements OnInit {

    products!: Product[];

    images!: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private productService: ProductService, private photoService: PhotoService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(products => {
            this.products = products;
        });

        this.photoService.getImages().then(images => {
            this.images = images;
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
    
}