export interface Registrant {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	contact_number: string;
	gender: string;
	religion?: string;
	address: string;
	profile_image?: string;
}

export interface EventInfo {
	id: number;
	name: string;
	start_time: string;
	location: string;
}

export interface RegistrationResponse {
	message: string;
	is_new_registration: boolean;
	registrant: Registrant;
	event: EventInfo;
	qr_token: string;
	qr_code_url: string;
	id_card_url: string;
	id_card_download_url: string;
}
