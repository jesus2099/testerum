import {Component, Input} from '@angular/core';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

    @Input() whiteColor = false;

}