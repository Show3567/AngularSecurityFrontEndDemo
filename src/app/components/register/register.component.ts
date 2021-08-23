import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ptc-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any;
  hide = true;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}
