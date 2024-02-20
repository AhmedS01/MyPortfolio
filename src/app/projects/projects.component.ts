import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { AlertifyService } from '../_services/alertify.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
projects: Project[];

constructor(private projectService: ProjectService, private alertify: AlertifyService, private sanitizer: DomSanitizer) { }

safeUrl: SafeUrl;

  ngOnInit() {
    this.getProjects();
    const unsafeUrl = 'https://drive.google.com/file/d/1396NjjwaSboRheRmpVlchgYe4EwrB9JU/view?usp=sharing';
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    }, error => {
      this.alertify.error(error);
    }
    );
  }

}
