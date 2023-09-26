import { environment } from './../../../../../../src/environments/environment';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AESCryptoService } from '../aescrypto/aescrypto.service';
import { BehaviorSubject } from 'rxjs';
import HrmStorage from 'src/libs/core/HrmStorage.js';
import { IPConfig } from 'src/IPConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  // public fields
  private key: string = IPConfig.CONSTANT_KEY;
  public userLogin: BehaviorSubject<UserModel | null> = new BehaviorSubject(null);
  constructor(
    private aesCrypto: AESCryptoService
  ) { }

  // private methods
  set(user: UserModel) {
    if (user) {
      let us = JSON.stringify(user);
      us = this.aesCrypto.encode(us);
      this.userLogin.next(user);
      localStorage.setItem(this.key, us);
    }
  }

  get(): UserModel | null {
    if (!this.key) return null;
    try {
      let sUs = localStorage.getItem(this.key);
      if (!sUs) { return null; }

      sUs = this.aesCrypto.decode(sUs);
      return JSON.parse(sUs);
    } catch (error) {
      return null;
    }
  }

  remove() {
    localStorage.removeItem(this.key);
    this.userLogin.next(null);
  }

  SetLanguage(lang){
    if(lang)
      HrmStorage.setData('Language', lang);
    else
    HrmStorage.setData('Language', 'vn');
  }
  getLanguage(){
      if(HrmStorage.getData('Language')){
        return HrmStorage.getData('Language')
      }
      else
        return 'vn';
  }
}
