import { CreateComponent } from "./create.component";
import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class CreateMakeCanDeactivateGuard implements CanDeactivate<CreateComponent>{

    canDeactivate(component: CreateComponent): boolean {
        if (component.createMakeForm.dirty) {

            return confirm("Are you sure you want to discard your changes?")
        }

        return true;
    }
}