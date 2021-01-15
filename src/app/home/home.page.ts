import { IQuestions } from './../models/interfaces/IQuestions';
import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IData } from '../models/interfaces/IData';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  questionsData: IQuestions[] = [];
  listResponse = [];
  sendData: IData;
  listResult = [];
  nameUser: string;
  constructor(private homeService: HomeService, public alertController: AlertController) {}

  ngOnInit(): void {
  }


  ionViewWillEnter(){
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.homeService.getQuestions().subscribe(res => {
      this.questionsData = res;
    });
  }

  onClick_saveForm() {
    this.questionsData.forEach(el => {
      const newArray = this.listResponse.filter(({ idQuestion }) => idQuestion === el.idQuestion);
      this.listResult.push(newArray.pop());
    });

    this.sendData = {
      nameUser: this.nameUser,
      result: this.listResult
    };

    this.homeService.postCreateQuestion(this.sendData).subscribe(res => {
      this.presentAlert();
      this.clearData();
      this.getAllQuestions();
    });
  }

  onChange_selectedAnswer(event, idQuestion) {
    const resultForm = {
      idQuestion,
      idAnswer: event.detail.value
    };

    this.listResponse =  [ ...this.listResponse, resultForm ];
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro Guardado',
      message: '¡Gracias por su tiempo!',
      buttons: ['OK']
    });

    await alert.present();
  }

  clearData() {
    this.listResponse = [];
    this.listResult = [];
    this.nameUser = '';
    this.sendData = null;
  }
}
