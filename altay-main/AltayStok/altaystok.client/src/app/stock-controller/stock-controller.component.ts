import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stock-controller',
  templateUrl: './stock-controller.component.html',
  styleUrls: ['./stock-controller.component.css']
})
export class StockControllerComponent implements OnInit {
  products: Product[] = [];
  pagedProducts: Product[] = [];
  pageSize = 10;
  activePage = 1;
  totalPages = 0;
  maxVisiblePages = 3;

  urunAdi: string = '';
  urunKodu: string = '';
  kategori: string = '';
  searchTerm: string = '';

  editMode: boolean = false;
  editProductId: number | null = null;

  constructor(private stockService: StockService, public authService: AuthService) { } 

  ngOnInit(): void {
    this.stockService.getProducts().subscribe(data => {
      this.products = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.setPage(this.activePage);
  }

  setPage(page: number): void {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.activePage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(event: Event, page: number): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.setPage(page);
  }

  getVisiblePages(): number[] {
    let start = Math.max(this.activePage - Math.floor(this.maxVisiblePages / 2), 1);
    let end = Math.min(start + this.maxVisiblePages - 1, this.totalPages);

    if (end - start < this.maxVisiblePages - 1) {
      start = Math.max(end - this.maxVisiblePages + 1, 1);
    }

    return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
  }

  addProduct(): void {
    const newProduct: Product = {
      urunId: 0,
      urunAdi: this.urunAdi,
      urunKodu: this.urunKodu,
      kategori: this.kategori
    };

    if (this.editMode && this.editProductId !== null) {
      newProduct.urunId = this.editProductId;
      this.stockService.updateProduct(this.editProductId, newProduct).subscribe(() => {
        this.updateData();
        this.resetForm();
      });
    } else {
      this.stockService.createProduct(newProduct).subscribe(product => {
        this.products.push(product);
        this.updatePagination();
        this.resetForm();
      });
    }
  }

  editProduct(product: Product): void {
    this.urunAdi = product.urunAdi;
    this.urunKodu = product.urunKodu;
    this.kategori = product.kategori;
    this.editMode = true;
    this.editProductId = product.urunId;
  }

  deleteProduct(urunId: number): void {
    this.stockService.deleteProduct(urunId).subscribe(() => {
      this.products = this.products.filter(product => product.urunId !== urunId);
      this.updatePagination();
    });
  }

  print(): void {
    window.print();
  }

  exportToExcel(): void {
    // Excel'e aktarma işlemi için kodlar
  }

  updateData(): void {
    this.stockService.getProducts().subscribe(data => {
      this.products = data;
      this.updatePagination();
    });
  }

  resetForm(): void {
    this.urunAdi = '';
    this.urunKodu = '';
    this.kategori = '';
    this.editMode = false;
    this.editProductId = null;
  }
}
