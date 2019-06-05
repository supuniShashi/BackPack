import {Component, Input, OnInit} from '@angular/core';
import {ToastComponent} from "../toast/toast.component";
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SpinnerService} from "../spinner/spinner-service.service";

@Component({
  selector: 'app-article-skeleton',
  templateUrl: './article-skeleton.component.html',
  styleUrls: ['./article-skeleton.component.css']
})
export class ArticleSkeletonComponent implements OnInit {

  @Input() imageURL: string;
  @Input() articleName: string;
  @Input() articleDate: string;
  @Input() articleDescription: string;
  @Input() disableInputFields: boolean;
  @Input() spinner_inputValue: number;
  @Input() spinner_minValue: number;
  @Input() spinner_maxValue: number;
  @Input() spinner_disabledInput: boolean;
  @Input() buttonText: string;
  @Input() fullArticle: string;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  isHovering: boolean;
  fileName: string;
  image: any;
  storageImage: any;

  constructor(private storage: AngularFireStorage, private fireStore: AngularFirestore, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
  }

  chooseImageFile(event) {
    if (event.target.files.item(0).type.split('/')[0] === 'image') {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(file);
      this.storageImage = event.target.files;
    } else {
      console.error('unsupported file type :( ');
    }
  }

  dropImage(event) {
    if (event.files.item(0).type.split('/')[0] === 'image') {
      var file = event.files[0];
      var reader = new FileReader();
      reader.onload = (event) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(file);

      this.storageImage = event.files;
    } else {
      console.error('unsupported file type :( ');
    }
  }

  toggleHover(event) {
    this.isHovering = event;
  }

  removeImage() {
    this.imageURL = undefined;
    this.percentage = undefined;
    this.snapshot = undefined;
    this.task = undefined;
  }

  startUpload(event: FileList) {
    const file = event.item(0)
    this.fileName = file.name;

    const path = `images/${file.name}`;
    const customMetadata = {app: 'LAKSHITHA MADUSHAN'};
    this.task = this.storage.ref('').child('images/' + this.spinner_inputValue).put(file, {customMetadata});
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap((snap) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.getImageDownloadURL();
        }
      })
    );
  }

  getImageDownloadURL() {
    this.task.then((res) => {
      res.ref.getDownloadURL().then((downloadURL) => {
        this.updateContentDatabase(downloadURL);
      }).catch(reason => {
        console.log(reason);
      });
    })
  }

  clickPushButton(buttonText) {

    ToastComponent.reset();

    if (buttonText == 'Push') {
      if (this.imageURL && this.articleName && this.articleDate && this.articleDescription) {
        ToastComponent.toastMessage = "Are You Sure ?";
        ToastComponent.toast = true;
        ToastComponent.on_off_btn = true;
        ToastComponent.btnResponse.subscribe({
          next: (res) => {
            if (res == 'Yes') {
              console.log("Yes Clicked!");
              this.startUpload(this.storageImage);
            }
            if (res == 'No') {
              console.log("No Clicked!");
            }
            if (res == 'Ok') {
              console.log("Ok Clicked!");
            }
          },
          error: (err) => console.log(err),
        });
      } else {
        ToastComponent.toastMessage = "Fill All Fields In The Container.";
        ToastComponent.toast = true;
        ToastComponent.on_off_btn = false;
        ToastComponent.btnResponse.subscribe({
          next: (res) => {
            if (res == 'Ok') {
              console.log("Ok Clicked!");
            }
          },
          error: (err) => console.log(err),
        });
      }
    }
    if (buttonText == 'Update') {
      if (this.imageURL && this.articleName && this.articleDate && this.articleDescription) {

        let reference = this.fireStore.collection('articles', ref => {
          return ref.where('articleNumber', '==', this.spinnerService.getSpinnerInstantValue())
        });

        if (this.storageImage) {
          const customMetadata = {app: 'LAKSHITHA MADUSHAN'};
          this.task = this.storage.ref('').child(`images/${this.spinnerService.getSpinnerInstantValue()}`).put(this.storageImage.item(0), {customMetadata});
          this.percentage = this.task.percentageChanges();

          this.snapshot = this.task.snapshotChanges().pipe(
            tap((snap) => {
              if (snap.bytesTransferred === snap.totalBytes) {
                this.task.then((res) => {
                  res.ref.getDownloadURL().then((downloadURL) => {
                    reference.get().subscribe((value) => {
                      value.forEach((doc) => {
                        doc.ref.update({
                          'imageURL': downloadURL,
                          'articleName': this.articleName,
                          'articleDate': this.articleDate,
                          'articleDescription': this.articleDescription,
                        }).then((res) => {
                          console.log('Successfully Updated Article !');
                          ToastComponent.toastMessage = "Successfully Updated Article !";
                          ToastComponent.toast = true;
                          ToastComponent.on_off_btn = false;

                          ToastComponent.btnResponse.subscribe({
                            next: (res) => {
                              if (res == 'Ok') {
                                console.log("Ok Clicked!");
                                window.location.reload();
                              }
                            },
                            error: (err) => console.log(err),
                          });
                        });
                      })
                    });
                  }).catch(reason => {
                    console.log(reason);
                  });
                })
              }
            })
          );
        } else {
          reference.get().subscribe((value) => {
            value.forEach((doc) => {
              doc.ref.update({
                'articleName': this.articleName,
                'articleDate': this.articleDate,
                'articleDescription': this.articleDescription,
              }).then((res) => {
                console.log('Successfully Updated Article !');
                ToastComponent.toastMessage = "Successfully Updated Article !";
                ToastComponent.toast = true;
                ToastComponent.on_off_btn = false;

                ToastComponent.btnResponse.subscribe({
                  next: (res) => {
                    if (res == 'Ok') {
                      console.log("Ok Clicked!");
                      window.location.reload();
                    }
                  },
                  error: (err) => console.log(err),
                });
              });
            })
          })
        }

      } else {
        ToastComponent.toastMessage = "Fill All Fields In The Container.";
        ToastComponent.toast = true;
        ToastComponent.on_off_btn = false;
        ToastComponent.btnResponse.subscribe({
          next: (res) => {
            if (res == 'Ok') {
              console.log("Ok Clicked!");
            }
          },
          error: (err) => console.log(err),
        });
      }
    }
    if (buttonText == 'Delete') {

      ToastComponent.toastMessage = "Are You Sure ?";
      ToastComponent.toast = true;
      ToastComponent.on_off_btn = true;
      ToastComponent.btnResponse.subscribe({
        next: (res) => {
          if (res == 'Yes') {
            console.log("Yes Clicked!");

            this.storage.ref('').child(`images/${this.spinnerService.getSpinnerInstantValue()}`).delete();
            let reference = this.fireStore.collection('articles', ref => {
              return ref.where('articleNumber', '==', this.spinnerService.getSpinnerInstantValue())
            });

            reference.get().subscribe((value) => {
              value.forEach((doc) => {
                doc.ref.delete().then((res) => {

                  console.log('Successfully Deleted Article !');
                  ToastComponent.toastMessage = "Successfully Deleted Article !";
                  ToastComponent.toast = true;
                  ToastComponent.on_off_btn = false;

                  ToastComponent.btnResponse.subscribe({
                    next: (res) => {
                      if (res == 'Ok') {
                        console.log("Ok Clicked!");
                        window.location.reload();
                      }
                    },
                    error: (err) => console.log(err),
                  });
                });
              })
            });

          }
          if (res == 'No') {
            console.log("No Clicked!");
          }
          if (res == 'Ok') {
            console.log("Ok Clicked!");
          }
        },
        error: (err) => console.log(err),
      });

    }
  }

  updateContentDatabase(downloadURL) {
    this.fireStore.collection('articles').add({
      'imageURL': downloadURL,
      'articleName': this.articleName,
      'articleDate': this.articleDate,
      'articleDescription': this.articleDescription,
      'articleNumber': this.spinner_inputValue
    }).then((res) => {
      ToastComponent.toastMessage = "Successfully Uploaded !";
      ToastComponent.toast = true;
      ToastComponent.on_off_btn = false;

      ToastComponent.btnResponse.subscribe({
        next: (res) => {
          if (res == 'Ok') {
            console.log("Ok Clicked!");
            window.location.reload();
          }
        },
        error: (err) => console.log(err),
      });
    }).catch((error) => {
      console.error(error);
    });
  }
}
