import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService} from '../../services/project.service';
import {UploadService } from '../../services/upload.service'
import { Global } from "../../services/global"
import {Router,ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>
  public save_project: any
  public url: string
 


  constructor(
    private _projectservice: ProjectService,
    private  _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.project = new Project('','','','',2021,'','')
    this.title = 'Editar Proyecto'
    this.status = ''
    this.filesToUpload = []
    this.save_project = ''
    this.url = Global.url
   
  }


  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id

      this.getProject(id)

    })
  }

  getProject(id:any){
    this._projectservice.getProject(id).subscribe(
      response => {

        this.project = response.project;
      },
      error =>{
        console.log(<any>error)
      }
    )

  }
    onSubmit(form:any){
      // guardar los datos basicos
      this._projectservice.updateProject(this.project).subscribe(
        response => {

          if(response.project){
            
            // subir la imagen
            if(this.filesToUpload.length >= 1){

            this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [],this.filesToUpload,'image')
            .then((result:any) =>{
              
              this.save_project = result.project
              this.status = 'success'   
            })
          }else{
            this.save_project = response.project
            this.status = 'success'

          }
          }else{
            this.status = 'failed'
          }
        },
        error =>{
        console.log(<any>error)
      }
      )
    }

  fileChangeEvent(fileInput:any){
  this.filesToUpload = <Array<File>>fileInput.target.files
  }

}