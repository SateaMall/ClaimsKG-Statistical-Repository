import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltreService {


  private apiUrl_first_graph = "";
  private apiUrl_top_entity_graph = "";
  private apiUrl_per_source_label = "";
  private apiUrl_per_langue = "";
  private apiUrl_per_topic_label = ""
  private apiUrl_per_label_true = ""
  private apiUrl_per_label_false = ""
  private apiUrl_per_label_mixture = ""
  private apiUrl_per_label_other = ""

  private submitTriggeredSource = new Subject<void>();
  private submitTriggeredTopEntity = new Subject<void>();
  private submitTriggeredSourceLabel = new Subject<void>();
  private submitTriggeredPerLangue = new Subject<void>();
  private submitTriggeredLabel = new Subject<void>();


  submitTriggered$ = this.submitTriggeredSource.asObservable();
  submitTriggeredTopEntity$ = this.submitTriggeredTopEntity.asObservable();
  submitTriggeredSourceLabel$ = this.submitTriggeredSourceLabel.asObservable();
  submitTriggeredPerLangue$ = this.submitTriggeredPerLangue.asObservable();
  submitTriggeredLabel$ = this.submitTriggeredPerLangue.asObservable();


  data: any
  
  constructor(private http: HttpClient) { 

  }

  triggerSubmit() {
    this.submitTriggeredSource.next();
  }

  onSubmit(granularite: string,debut: string, fin: string){
      if(debut.length>0 && fin.length>0){
        this.apiUrl_first_graph = "http://127.0.0.1:5000/json_per_date1_label?date1="+debut+"&date2="+fin+"&granularite="+granularite
      }else{
        this.apiUrl_first_graph = "http://127.0.0.1:5000/json_per_date1_label?date1=1996&date2=2024&granularite="+granularite
      }
      this.apiUrl_per_topic_label="http://127.0.0.1:5000/json_born_per_topics/"+debut+"/"+fin
      this.apiUrl_top_entity_graph = "http://127.0.0.1:5000/json_per_entity_date1_date2/"+debut+"/"+fin
      this.apiUrl_per_source_label = "http://127.0.0.1:5000/json_born_per_source_label/"+debut+"/"+fin
      this.apiUrl_per_langue = "http://127.0.0.1:5000/json_per_langue_label/"+debut+"/"+fin
      this.apiUrl_per_label_true = "http://127.0.0.1:5000/number_true/"+debut+"/"+fin
      this.apiUrl_per_label_false = "http://127.0.0.1:5000/number_false/"+debut+"/"+fin
      this.apiUrl_per_label_mixture = "http://127.0.0.1:5000/number_mixture/"+debut+"/"+fin
      this.apiUrl_per_label_other = "http://127.0.0.1:5000/number_other/"+debut+"/"+fin

    this.submitTriggeredSource.next();
    this.submitTriggeredTopEntity.next();
    this.submitTriggeredSourceLabel.next();
    this.submitTriggeredPerLangue.next();
    this.submitTriggeredLabel.next();

  }

  fetchDataFirstGraph() :Observable<any[]>{
    var results = this.http.get<any>(this.apiUrl_first_graph)
    return results;
}

fetchDataTopEntity() :Observable<any[]>{
  var results = this.http.get<any>(this.apiUrl_top_entity_graph)
  return results;
}

fetchDataPerSourceLabel() :Observable<any[]>{
  var results = this.http.get<any>(this.apiUrl_per_source_label)
  return results;
}

fetchDataPerLangue() :Observable<any[]>{
  var results = this.http.get<any>(this.apiUrl_per_langue)
  return results;
}
fetchDataPerTopic() {
  var results = this.http.get<any>(this.apiUrl_per_topic_label)
  return results;
}
fetchDataSummary() : Observable<any[]>[]{
  console.log(this.apiUrl_per_label_true)
  return [this.http.get<any>(this.apiUrl_per_label_true),this.http.get<any>(this.apiUrl_per_label_false),this.http.get<any>(this.apiUrl_per_label_mixture),this.http.get<any>(this.apiUrl_per_label_other)]
}
}