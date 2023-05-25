import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces'

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [ ];
    private _tagHistory: string[] = [];
    private apiKey:string = 'nYDoHoOWRLRI7kRQGKvyqoqRny47jwCu';
    private serviceUrl:string = "http://api.giphy.com/v1/gifs"

    constructor(
        private http: HttpClient
    ) { }

    get tagsHistory(){
        return [...this._tagHistory];
    }


    private organizeHistory(tag:string){
        tag = tag.toLocaleLowerCase();

        if( this._tagHistory.includes(tag) ){
            this._tagHistory = this._tagHistory.filter( oldTag => oldTag.toLowerCase() !== tag )
        }

        this._tagHistory.unshift(tag);
        this._tagHistory = this.tagsHistory.splice(0,10);
    }

    searchTag(tag: string):void{
        if( tag.length === 0 ) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10' )
        .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe( res =>{
                this.gifList = res.data;
                
            })
    }
    
}