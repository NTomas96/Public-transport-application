import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {MyErrorStateMatcher} from "../mailErrorCathcer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../shared/must-match.validator";
import {FileInput} from "ngx-material-file-input";
import {UsersService} from "../api/services/users.service";
import {UserLogin} from "../shared/user-login";
import {ErrorApiResponse} from "../api/models/error-api-response";
import {User} from "../api/models/user";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

	constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService, private userLogin: UserLogin) {
	}

	validationMessages = {
		firstName: {
			required: "Niste uneli ime."
		},
		lastName: {
			required: "Niste uneli Prezime."
		},
		email: {
			required: "Unesite email.",
			email: "Unesite ispravnu email adresu."
		},
		password: {
			required: "Niste uneneli lozinku.",
			minlength: "Greska pri unosu (min 6 karaktera)."
		},
		confirmPassword: {
			required: "Niste ponovili lozinku.",
			mustMatch: "Nisu iste lozinke."
		},
		passwordGroup: {
			passwordMismatch: "Lozinke se ne poklapaju, potvrdi lozinku ponovo."
		},
		dayOfBirth: {
			required: "Unesite datum rodjnja."
		},
		address: {
			required: "Unesite adresu."
		},
		passengerType: {
			required: "Izaberite tip putnika."
		}
	};

	formErrors = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		dayOfBirth: "",
		address: "",
		passengerType: ""
	};

	matcherEmail = new MyErrorStateMatcher();

	passengerTypes = ["Regularani", "Student", "Penzioner"];
	verificationStatuses = [ "Obradjuje se" , "Prihvacen", "Odbijen"];

	editProfileForm = this.fb.group({
		firstName: ["", [Validators.required]],
		lastName: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]],
		confirmPassword: ["", [Validators.required]],
		dayOfBirth: ["", [Validators.required]],
		address: ["", [Validators.required]],
		passengerType: [""],
		additionalInfo: [""],
		verificationStatus: [""]},
		{ validator: MustMatch("password", "confirmPassword")}
		);


	hideP: boolean;
	hideCP: boolean;

	additionalInfo = null;
	// verificationStatus = null;

	ngOnInit() {
		if (! this.userLogin.isLoggedIn()) {
			this.router.navigateByUrl("/login");
		}

		this.hideP = true;
		this.hideCP = true;

		this.editProfileForm.valueChanges.subscribe(() => {
			this.logValidationErrors(this.editProfileForm);
		});

		this.usersService.getMe().subscribe(
			(user: User) => {
				this.editProfileForm.setValue({
					firstName: user.firstName,
					lastName: user.lastName,
					password: user.password,
					confirmPassword: user.password,
					email: user.email,
					dayOfBirth: user.dayOfBirth,
					address: user.address,
					passengerType: user.passengerType,
					additionalInfo: user.additionalInfo,
					verificationStatus: user.verificationStatus
				}, {emitEvent: false});
				this.additionalInfo = user.additionalInfo;
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	logValidationErrors(group: FormGroup = this.editProfileForm): void {
		Object.keys(group.controls).forEach((key: string) => {
			const abstractControl = group.get(key);

			this.formErrors[key] = "";
			if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
				const messages = this.validationMessages[key];

				for (const errorKey in abstractControl.errors) {
					if (errorKey) {
						this.formErrors[key] += messages[errorKey] + " ";
					}
				}
			}

			if (abstractControl instanceof FormGroup) {
				this.logValidationErrors(abstractControl);
			}
		});
	}

	onSubmit() {
		this.editProfileForm.value.additionalInfo = this.additionalInfo;

		this.usersService.editProfile$Json({body: this.editProfileForm.value as User}).subscribe(
			() => {
				alert("Izmene prihvacene.");
			},
			(error: ErrorApiResponse) => {
				alert("Error " + error.errorMessage);
			}
		);
	}

	onFileChanged() {
		if (this.editProfileForm.value.additionalInfo !== null && this.editProfileForm.value.additionalInfo instanceof FileInput) {
			const reader  = new FileReader();
			reader.addEventListener("load", () => {
				this.additionalInfo = reader.result;
			}, false);

			reader.readAsDataURL(this.editProfileForm.value.additionalInfo.files[0]);
		}
	}

}
