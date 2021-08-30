import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export abstract class BaseService<T> {
  private readonly endpoint: string;


  protected constructor(protected http: HttpClient, endpoint: string) {
    this.endpoint = endpoint;
  }

  protected getUrl(): string {
    return `${environment.api_url}${this.endpoint}`
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl());
  }

  findOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.getUrl()}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl()}/${id}`);
  }

  save(object: T): Observable<T> {
    return this.http.post<T>(this.getUrl(), object);
  }
}
