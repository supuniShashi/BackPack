export class ArticleBody {
  imageURL: string;
  articleName: string;
  articleDate: string;
  articleDescription: string;
  articleNumber: number;

  constructor() {
    this.imageURL = '../../assets/images/404.jpg';
    this.articleName = '';
    this.articleDate = '';
    this.articleDescription = '';
    this.articleNumber = null;
  }
}
