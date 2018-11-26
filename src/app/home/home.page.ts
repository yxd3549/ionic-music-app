import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private file: File, private media: Media) { }

  private song: MediaObject;

  private isSongPaused = false;

  public playMusic() {
  console.log( 'playMusic called' );
  console.log( 'path: ' + this.file.dataDirectory );
  // if song MediaObject doesn't already exist, create a new one
  try {
    if ( !this.song ) {
      console.log('path: ' + this.file.applicationDirectory);
      let path = (this.file.applicationDirectory + 'www/assets/media/LeanOnMe.mp3' ).replace(/^file:\/\//, '');
      this.song = this.media.create( path );
      // this.song = this.media.create( "../../assets/media/LeanOnMe.mp3" );
      this.song.play();
    }
      // if song is paused, don't recreate it; just play it
    else if ( this.isSongPaused ) {
      this.song.play();
      this.isSongPaused = false;
    }
  }
  catch ( e ) {
    console.log( 'error playing song\n' + e );
  }
}

public pauseMusic() {
  // only try to pause if the song exists
  if ( this.song ) {
    this.song.pause();
    this.isSongPaused = true;
  }
}

public stopMusic() {
  // stop the song, only if it exists
  if ( this.song ) {
    this.song.stop();
    this.song.release(); // frees up the memory
    this.song = null;
    this.isSongPaused = false;
  }
}



}
