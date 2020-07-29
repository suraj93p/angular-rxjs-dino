import { Component } from "@angular/core";
import { BehaviorSubject, pipe } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { dinosaurs } from "./dinosaurs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  dinosaurs$ = new BehaviorSubject<string[]>(null);
  filteredDinosaurs$;
  dinoFilter = new FormControl("");
  constructor() {
    this.dinosaurs$.next(dinosaurs);
  }

  ngOnInit() {
    this.filteredDinosaurs$ = this.dinoFilter.valueChanges.pipe(
      startWith(""),
      switchMap(v =>
        this.dinosaurs$.pipe(
          map((val: string[]) => {
            if (!v) {
              return val;
            }
            return val.filter(
              x => x.toLowerCase().indexOf(v.toLowerCase()) > -1
            );
          })
        )
      )
    );
  }
}
