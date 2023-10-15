import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentRequest } from 'src/core/models/request/comment-request.model';
import { ApiService } from 'src/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  commentRequest: CommentRequest = <CommentRequest>{};
  comments: Comment[] = [];
  

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getComments();
  }

  addComment() {
    this.apiService.addComment(this.commentRequest).subscribe((response) => {
      this.commentRequest = <CommentRequest>{};
      this.getComments(); // Yorumlarınızı güncellemek için
    });
  }

  getComments() {
    this.apiService.getComments().subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }
}
