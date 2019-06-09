import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent }      from './test/test.component';
import { TestComponent2 }      from './test/test2.component';
import { TestComponent3 }      from './test/test3.component';

const routes: Routes = [
	{ path: 'test', component: TestComponent },
	{ path: 'test2', component: TestComponent2 },
	{ path: 'test3', component: TestComponent3 },
	{ path: '', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
