import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../../../core/services/api/api.service";
import { House } from 'src/core/models/house.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HouseRequest } from '../../../../../src/core/models/request/addHouse-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-all-house',
  templateUrl: './all-house.component.html',
  styleUrls: ['./all-house.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AllHouseComponent implements OnInit {
  public houseRequest: HouseRequest = <HouseRequest>{}

  houseAddDialog: boolean = false;
  houseEditDialog: boolean = false;
  openModel: boolean = false;

  HouseToEdit: House | null = null;

  filteredHouses: House[] = [];
  public searchHouseName: string = '';

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }


  searchHouse(searchKey: string) {
    this.filteredHouses = this.houses.filter((house) => {
      const targetKey = house.id + ' ' + house.houseName;
      return targetKey.includes(searchKey);
    });
  }

  houses: House[] = [];
  ngOnInit() {
    this.refresh()
  }
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {
    this.apiService.getAllEntities(House).subscribe((response) => {
      this.houses = response.data;
      this.filteredHouses=this.houses;
      console.log(this.houses)
    });
    //console.log(this.users)

  }


  


  onCreate(entity: HouseRequest) {
    this.createEntity<HouseRequest>(entity, 'House').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Ev ekleme başarılı', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }


  selectedFiles: File[] = [];

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
  }

  deleteFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  addNewHouse() {
    this.houseAddDialog = true;
  }

  deleteHouse(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarı ile silindi', life: 3000 });
      }
    })
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, House);
  }

  // editHouse() {
  //   this.houseEditDialog = true;
  // }

  openEditDialog(id: number) {
    this.apiService.getEntityById<House>(id, House).then((response) => {
      if (response && response.data) {
        this.houseEditDialog = true;
        this.HouseToEdit = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Ev bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Ev alınırken bir hata oluştu:', error);
    });
  }

  onUpdate(id: number, updatedHouse: House) {
    this.update(id, updatedHouse).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Ev güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedHouse: House) {
    return this.apiService.updateEntity(id, updatedHouse, House);
  }

  hideDialog() {

  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }

}
