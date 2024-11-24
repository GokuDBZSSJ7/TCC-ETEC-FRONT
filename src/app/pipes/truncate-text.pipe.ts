import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
   name: 'truncateText',
   standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
   transform(proposalDescription: string | undefined, maxLength: number = 42): string {
      if (!proposalDescription) return '';

      const words = proposalDescription.split(' ');

      if (words.length > maxLength) {
         return words.slice(0, maxLength).join(' ') + '...';
      }

      return proposalDescription;
   }

}