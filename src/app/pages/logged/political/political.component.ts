import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDividerModule } from '@angular/material/divider';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';
import { UserService } from '../../../services/user.service';
import { ProposalCreateComponent } from './proposal-create/proposal-create.component';
import { ProposalService } from '../../../services/proposal.service';
import { ViewProposalComponent } from '../proposals/view-proposal/view-proposal.component';

@Component({
  selector: 'app-political',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogContent,
    MatSelectModule,
    NgSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './political.component.html',
  styleUrl: './political.component.scss'
})
export class PoliticalComponent implements OnInit {
  user: any;
  myUser = this.authService.getUser();
  imageUrl: string | ArrayBuffer | null = null;
  form!: FormGroup;
  edit: boolean = false;
  selectedStateId: any;
  states: any[] = []
  cities: any[] = []
  dialog = inject(MatDialog);
  proposals: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private stateService: StateService,
    private cityService: CityService,
    private fb: FormBuilder,
    private userService: UserService,
    private proposalService: ProposalService
  ) { }

  ngOnInit() {
    
    if (history.state && history.state.political) {
      this.user = history.state.political;
      console.log(this.user);
    }
    console.log(this.user.email, '-', this.myUser.email);

    this.listStates();
    this.createForm();
    this.listProposals();
  }

  listStates() {
    this.stateService.all().subscribe({
      next: res => {
        this.states = res;
      }
    })
  }

  openProposalsPage(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        political: item
      }
    };
    this.router.navigate(['/proposals'], navigationExtras);
    console.log(item);
  }

  listProposals() {
    this.proposalService.myProposals(this.user.id).subscribe({
      next: res => {
        this.proposals = res;
        console.log(this.proposals);
        
      }
    })
  }

  createForm() {
    this.form = this.fb.group({
      city_id: null,
      state_id: null,
      image_url: null,
    });
  }

  onStateChange(): void {
    console.log(this.selectedStateId);

    this.form.patchValue({
      state_id: this.selectedStateId
    })

    if (this.selectedStateId) {
      this.cityService.all(this.selectedStateId).subscribe(data => {
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ProposalCreateComponent, {
      data: item,
      width: '60%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    })
  }

  openViewProposalDialog(item: any) {
    const dialogRef = this.dialog.open(ViewProposalComponent, {
      data: item,
      width: '60%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const base64String = e.target.result as string;
          this.imageUrl = base64String;
          this.form.get('image_url')?.setValue(base64String);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      const filteredData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] !== null && formData[key] !== '' && formData[key] !== undefined) {
          acc[key] = formData[key];
        }
        return acc;
      }, {} as any);
  
      if (filteredData.image_url === null) {
        delete filteredData.image_url;
      }

      if (filteredData.city_id === null) {
        delete filteredData.city_id;
      }
  
      this.userService.update(filteredData, this.user.id).subscribe({
        next: res => {
          console.log("Dados atualizados com sucesso", res);

           const updatedUser = { ...this.user, ...filteredData };
           this.authService.setUser(updatedUser);
 
          this.user = updatedUser;
          this.refreshPage()
        },
        error: err => {
          console.error("Erro ao atualizar os dados", err);
        }
      });
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}
