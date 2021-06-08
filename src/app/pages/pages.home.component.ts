import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { IProfile } from './pages.home.intefaces';


@Component({
  selector: 'HomePage',
  templateUrl: './pages.home.html',
  styleUrls: ['./pages.home.css']
})
@Inject(ApiService)
export class HomePage implements OnInit {

  constructor(private apiService: ApiService) { }

  public isDataLoaded: boolean = false;
  public hasErrors: boolean = false;
  public errorMsg: string = '';

  public profile: IProfile = {
    name: '',
    avatar: '',
    organization: '',
    title: '',
    phones: [],
    emails: [],
    profiles: []
  }

  ngOnInit() {
    this.isDataLoaded = false;
  }

  onClickSubmit(data: any) {
    if (data.username !== '' && data.username !== undefined) {
      this.apiService.getUserInfo(data.username).subscribe({
        next:
          (res: any) => {
            this.hasErrors = false;
            this.isDataLoaded = true;
            console.log(res);
            this.profile.name = res.fullName;
            this.profile.avatar = res.avatar;
            this.profile.phones = res.details.phones.size > 0 ? res.details.phones : ['unknown'];
            this.profile.emails = res.details.emails.size > 0 ? res.details.emails : ['unknown'];
            this.profile.profiles = Object.entries(res.details.profiles).map((value:any) => {return {service: value[0], url: value[1]['url'], bio:''} });
          },
        error:
          (err: HttpErrorResponse) => {
            console.log(err);
            this.errorMsg = 'Looks like your search didnt returned with value, please double check that you are providing correct search input.';
            this.hasErrors = true;
          }
      });
    }
  }

  goBackButtonClick() {
    this.isDataLoaded = false;
    this.hasErrors = false;
  }
}