import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.scss']
})
export class AddTextComponent implements OnInit {

  public mostrarSpinner: boolean = false;

  uploadedFiles: Array<File>;

  htmlContent: string;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '10',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        //'indent',
        //'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        //'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  tituloFormControl = new FormControl('', [
    Validators.required,
  ]);

  subTituloFormControl = new FormControl('', [
    Validators.required,
  ]);

  ordenFormControl = new FormControl('', [
    Validators.required,
  ]);



  registroFormTexto: FormGroup = this.formBuilder.group({
    titulo: this.tituloFormControl,
    detalle: this.subTituloFormControl,
    orden: this.ordenFormControl,
  });


  registrarTexto(agregar: Boolean = false) {
      
  }

  editarSlider(agregar: Boolean = false) {

  }

  eliminarSlider(agregar: Boolean = false) {
  }

  closeModal() {
    let respuesta = {
      'result': false,
      'msj': null
    }
    this.dialogRef.close(respuesta);
  }

  clearForm() {
    this.registroFormTexto.reset();
    Object.keys(this.registroFormTexto.controls).forEach(key => {
      this.registroFormTexto.get(key).setErrors(null);
    });
  }

}
