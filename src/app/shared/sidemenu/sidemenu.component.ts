import { Component, contentChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/user.service';

const CANDIDATE_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<g clip-path="url(#clip0_126_1527)">
<path d="M16.682 14.8248C20.7772 14.8248 24.0923 11.5046 24.0923 7.41188C24.0923 3.31792 20.7772 0 16.682 0C12.5885 0 9.27008 3.31817 9.27008 7.41188C9.27008 11.5048 12.5885 14.8248 16.682 14.8248Z" fill="black"/>
<path d="M18.5904 15.1235L16.7447 16.9827L14.9548 15.104C14.9487 15.1056 14.942 15.1056 14.9379 15.1071C14.6392 15.1788 13.3715 15.5822 11.7267 16.7618C11.7121 16.7721 11.3781 17.0037 11.2217 17.1017C10.9113 17.2978 10.4477 17.5817 9.88695 17.8496C9.32948 18.122 8.66912 18.3685 8.06815 18.4975C7.7715 18.5563 7.50351 18.5725 7.28826 18.5655C7.06583 18.5614 6.93786 18.5133 6.8022 18.4539C6.72926 18.4371 6.67525 18.3685 6.59539 18.3306C6.53294 18.2476 6.44259 18.208 6.37476 18.0902C6.33842 18.0383 6.2967 17.9948 6.25779 17.9385L6.15259 17.7437C6.0712 17.628 6.01975 17.4555 5.95398 17.307C5.88205 17.1642 5.84494 16.9763 5.79145 16.8118C5.73565 16.6487 5.69828 16.4698 5.66577 16.2904C5.58336 15.9454 5.54471 15.5852 5.50452 15.2545C5.45512 14.9284 5.45819 14.6011 5.43388 14.3249C5.43311 14.317 5.43362 14.3101 5.43311 14.3021C5.59001 14.0774 5.80322 13.8747 6.0625 13.6866C6.32152 13.5005 6.52526 13.1908 6.66041 12.8946C7.18613 11.7267 7.4147 11.0579 7.79197 9.83294C7.95118 9.31694 6.99954 8.74591 6.3786 10.2064C6.11599 10.7354 6.23066 10.7897 5.9637 11.3167L5.86823 11.4961C5.86823 11.4961 5.8132 10.9873 5.80603 10.8335C5.72336 9.06994 5.64786 8.12394 5.56314 6.36043C5.5401 5.8713 5.33636 5.65348 4.95883 5.67959C4.59947 5.70544 4.44155 5.92684 4.46075 6.40215C4.49939 7.36479 4.54547 7.50863 4.58437 8.4705C4.60254 8.83319 4.36656 8.76434 4.36809 8.46897C4.30564 7.15695 4.246 6.86721 4.19328 5.55494C4.17843 5.19866 4.03023 4.96497 3.66499 4.92581C3.31203 4.88844 3.07092 5.18151 3.08884 5.62763C3.14131 6.89588 3.20402 7.14159 3.25623 8.4101C3.27466 8.78532 3.04379 8.7262 3.04302 8.44414C2.99618 7.43876 2.96649 7.24961 2.8938 6.24601C2.87972 6.04381 2.75687 5.77813 2.59792 5.67217C2.21015 5.41391 1.78629 5.74307 1.80421 6.27852C1.84158 7.40139 1.90224 7.70597 1.94857 8.82781C1.97647 9.11576 1.75097 9.19306 1.73869 8.85776C1.70388 8.14339 1.677 8.24629 1.63784 7.53269C1.61993 7.20737 1.43462 7.02155 1.10751 7.00901C0.777072 6.99698 0.59509 7.1892 0.541339 7.49993C0.518304 7.62714 0.530589 7.76151 0.536476 7.89179C0.611727 9.58313 0.65703 10.4587 0.781935 12.1462C0.826471 12.7372 0.89737 13.1498 0.99412 13.6269C1.09087 14.104 1.35706 14.329 1.42079 14.5653C1.40595 14.8386 1.38803 15.1258 1.39878 15.4552C1.40467 15.8929 1.40723 16.3659 1.46789 16.8924C1.48888 17.1514 1.51652 17.4202 1.57437 17.7068C1.6294 17.992 1.66267 18.2748 1.75865 18.5842C1.84772 18.8906 1.91632 19.1954 2.06068 19.5225C2.12697 19.6838 2.19377 19.8461 2.26109 20.0089C2.34094 20.1734 2.43769 20.3398 2.53009 20.5052C2.69877 20.8369 2.96905 21.1645 3.21912 21.4849C3.51654 21.7903 3.816 22.1003 4.18764 22.3452C4.90124 22.8551 5.7528 23.197 6.53294 23.3265C7.31692 23.467 8.05125 23.4681 8.70803 23.4054C8.88438 23.3856 9.10015 23.3624 9.26908 23.3365L9.27394 32H24.6009V28.6826C24.939 29.6393 25.2577 30.7438 25.5595 32H31.4725C29.7241 23.8896 25.1481 17.2855 18.5904 15.1235ZM16.7616 31.6516H16.7288L14.9405 29.2055L16.7288 17.2581H16.7616L18.5512 29.2055L16.7616 31.6516Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_126_1527">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
`

const CANDIDATE_SPEECH_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M15.8867 7.13419C17.8568 7.13419 19.4538 5.53715 19.4538 3.56709C19.4538 1.59704 17.8568 0 15.8867 0C13.9167 0 12.3196 1.59704 12.3196 3.56709C12.3196 5.53715 13.9167 7.13419 15.8867 7.13419Z" fill="black"/>
<path d="M17.2803 10.8324H18.17C18.4565 10.8324 18.7068 10.9967 18.8241 11.2467C20.5902 11.9257 21.0084 14.0882 21.0921 15.4445H23.0219C22.1818 11.5409 19.9799 8.36264 16.8241 7.32244L15.9352 8.21696L15.0739 7.31274C15.0705 7.31351 15.0682 7.31351 15.0649 7.31427C14.6241 7.4199 9.98716 9.47479 8.97809 15.4443H11.8226C11.9675 14.8398 12.1214 14.3094 12.2844 13.8484V15.4443H19.9496C19.9702 14.5556 19.6493 13.7101 19.5947 13.5736C19.6056 13.6029 19.1477 12.5255 18.4027 12.2418C18.3274 12.2683 18.2493 12.2813 18.17 12.2813H17.2803C16.881 12.2813 16.5555 11.9563 16.5555 11.5567C16.5557 11.1574 16.8805 10.8324 17.2803 10.8324ZM16.8042 14.0997L15.9436 15.2769H15.927L15.0672 14.0997L15.927 8.34937H15.9436L16.8042 14.0997Z" fill="black"/>
<path d="M24.4767 15.8221H7.52301V17.6686H24.4767V15.8221Z" fill="black"/>
<path d="M10.0913 31.9999H21.909L23.0816 18.0883H8.91864L10.0913 31.9999Z" fill="black"/>
</svg>
`

const CHECK_CIRCLE_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Z"/></svg>
`

const PROPOSALS =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg>
`

const LOGOUT_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb1a27"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
`

const PERSON_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
`

const PARTY_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Z"/></svg>
  `

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  menus: any[] = [];
  userMenu: any[] = []
  user = this.authService.getUser();
  realUser: any;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    iconRegistry.addSvgIconLiteral('candidate_icon', sanitizer.bypassSecurityTrustHtml(CANDIDATE_ICON));
    iconRegistry.addSvgIconLiteral('candidate_speech_icon', sanitizer.bypassSecurityTrustHtml(CANDIDATE_SPEECH_ICON));
    iconRegistry.addSvgIconLiteral('check_circle_icon', sanitizer.bypassSecurityTrustHtml(CHECK_CIRCLE_ICON));
    iconRegistry.addSvgIconLiteral('proposals_icon', sanitizer.bypassSecurityTrustHtml(PROPOSALS));
    iconRegistry.addSvgIconLiteral('logout_icon', sanitizer.bypassSecurityTrustHtml(LOGOUT_ICON));
    iconRegistry.addSvgIconLiteral('person_icon', sanitizer.bypassSecurityTrustHtml(PERSON_ICON));
    iconRegistry.addSvgIconLiteral('party_icon', sanitizer.bypassSecurityTrustHtml(PARTY_ICON));

    this.userService.getUserById(this.user.id).subscribe({
      next: res => {
        this.realUser = res
      }
    })
  }

  logout(): void {
    this.authService.logout();
  }

  openPoliticalPage(item: any) {

    
    const navigationExtras: NavigationExtras = {
      state: {
        political: item
      }
    };
    this.router.navigate(['/political'], navigationExtras);
    console.log();
  }

  ngOnInit() {
    console.log(this.user);
    this.menus = this.accessTypeMenus(this.user.type)
    this.userMenu = [
      {
        label: 'Meu Perfil',
        icon: 'person_icon',
        tooltip: '',
        route: '/',
        handler: () => {
          this.openPoliticalPage(this.realUser);
        }
      },
      {
        label: 'Sair',
        icon: 'logout_icon',
        route: '/',
        classPanel: 'logout-btn',
        handler: () => {
          console.log('Logout handler called');
          this.logout();
        }
      }
    ];
  }

  accessTypeMenus(accessType: any) {
    if (accessType === 1) {
      return [{

        title: 'Módulos Gerais',
        contentMenus: [
          {
            label: 'Políticos',
            icon: 'candidate_icon',
            tooltip: '',
            route: '/politicians'
          }
        ]
      }];
    } else if (accessType === 2 || accessType === 4) {
      return [{
        title: 'Módulos Gerais',
        contentMenus: [
          {
            label: 'Políticos',
            icon: 'candidate_icon',
            tooltip: '',
            route: '/politicians'
          }
        ]
      },
      // {
      //   title: 'Módulos Administrativos',
      //   contentMenus: [
      //     {
      //       label: 'Propostas do Político',
      //       icon: 'proposals_icon',
      //       tooltip: '',
      //       route: '/'
      //     },
      //     {
      //       label: 'Área do Político',
      //       icon: 'candidate_icon',
      //       route: '/'
      //     }
      //   ]
      // }
      ];
    } else if (accessType === 3) {
      return [{
        title: 'Módulos Gerais',
        contentMenus: [
          {
            label: 'Políticos',
            icon: 'candidate_icon',
            tooltip: '',
            route: '/politicians'
          }
        ]
      },
      {
        title: 'Módulos Administrativos',
        contentMenus: [
          {
            label: 'Controle de Políticos',
            icon: 'check_circle_icon',
            tooltip: 'Aprovar político e designar a partido.',
            route: '/approve-politician'
          },
        ]
      }]
    } else {
      return [{
        title: 'Módulos Gerais',
        contentMenus: [
          {
            label: 'Políticos',
            icon: 'candidate_icon',
            tooltip: '',
            route: '/politicians'
          }
        ]
      },
      {
        title: 'Módulos Administrativos',
        contentMenus: [
          {
            label: 'Partidos',
            icon: 'party_icon',
            tooltip: '',
            route: '/parties'
          },
          {
            label: 'Controle de Políticos',
            icon: 'check_circle_icon',
            tooltip: 'Aprovar políticos e designar a partidos.',
            route: '/approve-politician'
          }
        ]
      }]
    }
  }

  // logout() {
  //   this.authService.logout();
  // }

}