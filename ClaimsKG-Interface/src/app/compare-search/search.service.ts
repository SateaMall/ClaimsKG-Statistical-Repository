import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  
  /**** Service to get the informations for the entity topic search ****/
  searchEntityTopic(selectedEntities: string[], firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });
  return this.http.get<string[]>('http://localhost:5000/search-entity-topic', { params });
  }


  /**** Service to get the informations for the entity search ****/
  searchEntity1(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });

  return this.http.get<string[]>('http://localhost:5000/search-entity1', { params });
  }
  searchEntity2(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });

  return this.http.get<string[]>('http://localhost:5000/search-entity2', { params });
  }
  searchEntity3(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });

  return this.http.get<string[]>('http://localhost:5000/search-entity3', { params });
  }
  searchEntity4(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });

  return this.http.get<string[]>('http://localhost:5000/search-entity4', { params });
  }

  /**** Service to get the informations for the topic search ****/
  searchTopic1(firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);
    return this.http.get<string[]>('http://localhost:5000/search-topic1', { params });
  }

  searchTopic2(firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);
    return this.http.get<string[]>('http://localhost:5000/search-topic2', { params });
  }

  searchTopic3(firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);
    return this.http.get<string[]>('http://localhost:5000/search-topic3', { params });
  }


  searchTopic4(firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);
    return this.http.get<string[]>('http://localhost:5000/search-topic4', { params });
  }

    /**** Service to get the informations for the topic-entity search ****/
    searchTopicEntity1(selectedEntities: string[], firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
      let params = new HttpParams()
      .set('firstDate', firstDate)
      .set('lastDate', lastDate)
      .set('topic', topic);
  
    // Append each `selectedEntity` as a separate query parameter
      selectedEntities.forEach((entity) => {
        params = params.append('selectedEntities', entity);
      });
      return this.http.get<string[]>('http://localhost:5000/search-topic-entity1', { params });
    }
  
    searchTopicEntity2(selectedEntities: string[], firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
      let params = new HttpParams()
      .set('firstDate', firstDate)
      .set('lastDate', lastDate)
      .set('topic', topic);
  
    // Append each `selectedEntity` as a separate query parameter
      selectedEntities.forEach((entity) => {
        params = params.append('selectedEntities', entity);
      });
    return this.http.get<string[]>('http://localhost:5000/search-topic-entity2', { params });
    }
    searchTopicEntity3(selectedEntities: string[], firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
      let params = new HttpParams()
      .set('firstDate', firstDate)
      .set('lastDate', lastDate)
      .set('topic', topic);
  
    // Append each `selectedEntity` as a separate query parameter
      selectedEntities.forEach((entity) => {
        params = params.append('selectedEntities', entity);
      });
      return this.http.get<string[]>('http://localhost:5000/search-topic-entity3', { params });
    }


  getTopics(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/topics');
  }

  compareTopic_entityGraph(topic1: string, topic2: string, firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('topic1', topic1)
    .set('topic2', topic2)
    .set('firstDate', firstDate)
    .set('lastDate', lastDate);
    return this.http.get<string[]>('http://localhost:5000/compare-topic-entities-common', { params });
  }

}
