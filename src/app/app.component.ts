import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feedapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  API_KEY: string = '683d50a364918726feadd7dc04e76ba6';
  TOP_HEADLINES_URL = 'https://gnews.io/api/v4/top-headlines?token=' + this.API_KEY;
  SEARCH_NEWS_URL = 'https://gnews.io/api/v4/search?token=' + this.API_KEY + '&q=';
  articles = [];
  title = '';
  showError = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getNews('');
  }

  getNews(topic) {
    this.showError = false;
    switch(topic){
      case 'all': this.callApi('World News', ''); break;
      case 'india': this.callApi('Bites from India', '&lang=en&country=in'); break;
      default: this.callApi('Top Stories', '&lang=en'); break;
    }
  }

  callApi(title, queryParams) { 
    this.title = title;
    this.getUrl(queryParams).subscribe(res => {
      this.articles = res['articles'];
      if(this.articles.length === 0){
        this.showError = true;
      }
    })
  }
  
  queryNews(query) { 
    this.title = "News regarding '" + query + "...'";
    return this.http.get(this.SEARCH_NEWS_URL + query).subscribe(res => {
      this.articles = res['articles'];
      if(this.articles.length === 0){
        this.showError = true;
      }
    })
  }

  getUrl(queryParams) { 
    return this.http.get(this.TOP_HEADLINES_URL + queryParams);
  }

}
