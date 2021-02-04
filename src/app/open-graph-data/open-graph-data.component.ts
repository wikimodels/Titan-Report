import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MENU } from 'consts/routes.consts';

@Component({
  selector: 'app-open-graph-data',
  templateUrl: './open-graph-data.component.html',
  styleUrls: ['./open-graph-data.component.css'],
})
export class OpenGraphDataComponent implements OnInit {
  data = {
    title: 'Результаты Опроса "Тренировки и Здоровье Позвоночника и Суставов"',
    description:
      'Мы хотим узнать, как мы можем помочь Вам оставаться сильными, красивыми и здоровыми',
    image: 'assets/images/vertical.jpg',
    type: 'website',
    locale: 'en_us',
  };
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate([MENU]);
    this.title.setTitle('Titan Survey');
    this.meta.addTags([
      { name: 'og:url', content: '/menu' },
      { name: 'og:title', content: this.data.title },
      { name: 'og:description', content: this.data.description },
      { name: 'og:image', content: this.data.image },
    ]);
  }
}
