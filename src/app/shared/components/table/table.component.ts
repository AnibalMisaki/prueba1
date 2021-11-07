import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  async ngOnInit() {
      this.dataSource.data = await this.postSvc.getAllPosts().then(y => y as PostI[])
    
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
  }

  onNewPost(){
    this.openDialog()
  }

  onEditPost(post: PostI){
    post.titlePost = 'Post One';
    this.postSvc.updatePostById(post).then(()=>{
      Swal.fire('Success!', 'Your post has been edited.', 'success')
      this.ngOnInit()
    }).catch((error) => {
      Swal.fire('Error', 'There was an error editing this post', 'error')
    });
  }

  onDeletePost(post: PostI){
    console.log('Delete post', post)
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't ve able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        //Quiere borrar
        this.postSvc.deletePostById(post).then(()=>{
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
          this.ngOnInit()
        }).catch((error) => {
          Swal.fire('Error', 'There was an error deleting  this post', 'error')
        });
        
      }
    })
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(async result =>{
      this.ngOnInit();
      console.log('Dialog result ' + result)
      console.log(this.postSvc.getAllPosts().then(y => y as PostI[]))
    })
    
    
  }
}
