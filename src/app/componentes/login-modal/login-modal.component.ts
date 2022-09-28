import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Input() show!: boolean;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }
  
}
