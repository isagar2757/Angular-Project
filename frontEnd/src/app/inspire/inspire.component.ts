import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-inspire',
  templateUrl: './inspire.component.html',
  styleUrls: ['./inspire.component.css']
})
export class InspireComponent implements OnInit {
  public safeURLs: SafeResourceUrl[] =[];
  public videos = [
    'https://www.youtube.com/embed/C8rrDuFLwaw',
    // 'https://www.youtube.com/embed/8FRPprqlojy',
    'https://www.youtube.com/embed/yBrRpb8aLwk',
    'https://www.youtube.com/embed/ngbgFB1_SdA',
  ];

  constructor(private _sanitizer: DomSanitizer) {
    this.videos.forEach(element => {
      this.safeURLs.push(
        this._sanitizer.bypassSecurityTrustResourceUrl(element)
      )

    });
    // this.safeURL = this._sanitizer
    //   .bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/WovwuOFBUuY');
  }

  ngOnInit() {
  }

}
