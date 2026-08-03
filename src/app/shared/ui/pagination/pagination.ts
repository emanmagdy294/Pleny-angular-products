import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

interface PaginationItem {
  label: number | '...';
  page?: number;
  disabled?: boolean;
  active?: boolean;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();

  readonly pages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const items: PaginationItem[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        items.push({
          label: i,
          page: i,
          active: i === current,
        });
      }

      return items;
    }

    items.push({
      label: 1,
      page: 1,
      active: current === 1,
    });

    if (current > 3) {
      items.push({
        label: '...',
        disabled: true,
      });
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      items.push({
        label: i,
        page: i,
        active: i === current,
      });
    }

    if (current < total - 2) {
      items.push({
        label: '...',
        disabled: true,
      });
    }

    items.push({
      label: total,
      page: total,
      active: current === total,
    });

    return items;
  });

  previous(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  next(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(item: PaginationItem): void {
    if (item.disabled || !item.page) {
      return;
    }

    this.pageChange.emit(item.page);
  }
}
