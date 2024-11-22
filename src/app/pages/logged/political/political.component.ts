import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidemenuService } from '../../../services/sidemenu.service';

@Component({
  selector: 'app-political',
  standalone: true,
  imports: [
    CommonModule,
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
  proposalsFinisheds: any[] = [];
  proposalsWorking: any[] = [];
  proposals: any[] = [];
  isSidemenuOpen: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private stateService: StateService,
    private cityService: CityService,
    private fb: FormBuilder,
    private userService: UserService,
    private proposalService: ProposalService,
    private breakpointObserver: BreakpointObserver,
    private sidemenuService: SidemenuService,
  ) { }

  ngOnInit() {
    if (history.state && history.state.political) {
      this.user = history.state.political;
    }

    this.userService.getUserById(this.user?.id).subscribe({
      next: res => {
        this.user = res;
      },
      error: err => {
        console.error('Erro ao buscar as informações atualizadas do usuário:', err);
      }
    });

    this.listStates();
    this.createForm();
    this.listProposals();
    console.log(this.myUser);

    this.sidemenuService.sidemenuSubject$.subscribe({
      next: res => {
        console.log('sidemenuState: ', res)
        this.isSidemenuOpen = res;
        console.log({ sidemenuState: this.isSidemenuOpen });
      }
    })
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
    this.proposalService.getFinishedProposals(this.user.id).subscribe({
      next: res => {
        this.proposalsFinisheds = Object.values(res);
      },
      error: err => {
        console.error('Erro ao buscar as propostas:', err);
        this.proposalsFinisheds = [];
      }
    });
    this.proposalService.getWorkingProposals(this.user.id).subscribe({
      next: res => {
        this.proposalsWorking = Object.values(res);
      },
      error: err => {
        console.error('Erro ao buscar as propostas:', err);
        this.proposalsWorking = [];
      }
    });

    this.proposalService.all().subscribe({
      next: res => {
        this.proposals = res
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
    // Define tamanho padrão para o modal
    let dialogWidth = '900px';
    let dialogHeight = 'auto';

    // Define breakpoints e ajusta o tamanho do modal
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Tela pequena (celular)
      Breakpoints.Small,  // Tela média (tablet)
      Breakpoints.Medium, // Tela maior (laptop)
      Breakpoints.Large,  // Tela desktop
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        dialogWidth = '100dvw';
        dialogHeight = '100dvh';
      } else if (result.breakpoints[Breakpoints.Small]) {
        dialogWidth = '80%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Medium]) {
        dialogWidth = '70%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Large]) {
        dialogWidth = '900px';
        dialogHeight = 'auto';
      }
      const dialogRef = this.dialog.open(ProposalCreateComponent, {
        data: item,
        width: dialogWidth,
        height: dialogHeight,
        maxWidth: '100vw',
        maxHeight: '100vh',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          window.location.reload();
        }
      })
    });
  }

  // openViewProposalDialog(item: any) {
  //   const dialogRef = this.dialog.open(ViewProposalComponent, {
  //     data: item,
  //     width: '1000px',
  //     height: '590px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.listProposals();
  //   })
  // }

  openViewProposalDialog(item: any) {
    // Define tamanho padrão para o modal
    let dialogWidth = '900px';
    let dialogHeight = 'auto';

    // Define breakpoints e ajusta o tamanho do modal
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Tela pequena (celular)
      Breakpoints.Small,  // Tela média (tablet)
      Breakpoints.Medium, // Tela maior (laptop)
      Breakpoints.Large,  // Tela desktop
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        dialogWidth = '100dvw';
        dialogHeight = '100dvh';
      } else if (result.breakpoints[Breakpoints.Small]) {
        dialogWidth = '80%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Medium]) {
        dialogWidth = '70%';
        dialogHeight = 'auto';
      } else if (result.breakpoints[Breakpoints.Large]) {
        dialogWidth = '900px';
        dialogHeight = 'auto';
      }
      const dialogRef = this.dialog.open(ViewProposalComponent, {
        data: item,
        width: dialogWidth,
        height: dialogHeight,
        maxWidth: '100vw',
        maxHeight: '100vh',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.listProposals();
      })
    });
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

          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.authService.setUser(updatedUser);

          this.user = updatedUser;
          // this.refreshPage();
          window.location.reload();
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

  generateProposalsPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Propostas - ${this.user?.name}`, 14, 22);


    this.proposals.forEach((proposal, index) => {
      const tableData: any[][] = [];

      tableData.push(['Título:', proposal.title || 'Sem Título']);
      tableData.push(['Área:', proposal.areas?.name || 'Sem Área']);
      tableData.push(['Status:', proposal.status || 'Sem Status']);

      const description = proposal.description || 'Sem Descrição';
      const descriptionLines = description.split(/\r?\n/).slice(0, 5);
      descriptionLines.forEach((line: number, idx: number) => {
        tableData.push([idx === 0 ? 'Descrição:' : '', line]);
      });

      tableData.push(['Investimento:', this.formatCurrency(proposal.budget) || 'Sem Orçamento']);

      autoTable(doc, {
        startY: 30,
        theme: 'grid',
        head: [['Campo', 'Informação']],
        body: tableData,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 'auto' },
        },
        headStyles: {
          fillColor: [211, 211, 211],
          textColor: [0, 0, 0],
        }
      });

      if (index < this.proposals.length - 1) {
        doc.addPage();
      }
    });

    doc.save('Propostas.pdf');
  }


  formatCurrency(value: number | string): string {
    if (value == null || isNaN(Number(value))) {
      return '';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    return `R$ ${numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  getLikesByPromisse() {

  }
}
