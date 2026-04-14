import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

// ---------------------------------------------------------------------------
// Scan QR check-in
// ---------------------------------------------------------------------------
export interface ScanQrResponse {
	status: "checked_in" | "already_checked_in" | "not_found";
	message: string;
	user?: {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
	};
	checked_in_at?: string;
	checked_in_by?: number;
}

const scanQrCheckIn = async ({ qr_token }: { qr_token: string }): Promise<ScanQrResponse> => {
	const response = await apiFetch<ScanQrResponse>(`/events/14/scan-qr`, "POST", { qr_token });
	return response;
};

export const useScanQrCheckIn = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (qr_token: string) => scanQrCheckIn({ qr_token }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events", "14", "users"] });
			queryClient.invalidateQueries({ queryKey: ["events", "14"] });
		},
	});
};

// Types for check-in mutations
interface CheckInUsersInput extends Record<string, unknown> {
	user_id?: number;
	user_ids?: number[];
}

interface CheckedInUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

interface CheckInSingleResponse {
	message: string;
	event: {
		id: number;
		name: string;
	};
	user: CheckedInUser;
	checked_in_at: string;
	checked_in_by: number;
}

interface CheckInBulkResponse {
	message: string;
	event: {
		id: number;
		name: string;
	};
	stats: {
		total_attempted: number;
		successful_check_ins: number;
		already_checked_in: number;
		not_registered: number;
		failed: number;
	};
	checked_in_users: CheckedInUser[];
	checked_in_at: string;
	checked_in_by: number;
}

type CheckInResponse = CheckInSingleResponse | CheckInBulkResponse;

// API function
const checkInUsers = async ({
	eventId,
	data,
}: {
	eventId: string;
	data: CheckInUsersInput;
}): Promise<CheckInResponse> => {
	const response = await apiFetch<CheckInResponse>(`/events/${eventId}/check-in`, "POST", data);
	return response;
};

// Custom hook for check-in mutation
export const useCheckInUsers = (eventId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CheckInUsersInput) => checkInUsers({ eventId, data }),
		onSuccess: () => {
			// Invalidate event users query to refresh the list
			queryClient.invalidateQueries({ queryKey: ["events", eventId, "users"] });

			// Invalidate event details
			queryClient.invalidateQueries({ queryKey: ["events", eventId] });
		},
		onError: (error) => {
			console.error("Error checking in users:", error);
		},
	});
};

// Combined hook for easier usage
export const useEventCheckInMutations = (eventId: string) => {
	const checkInMutation = useCheckInUsers(eventId);

	const handleCheckInUsers = async (userIds: number[]) => {
		try {
			const data = userIds.length === 1 ? { user_id: userIds[0] } : { user_ids: userIds };

			const response = await checkInMutation.mutateAsync(data);
			return response;
		} catch (error) {
			throw error;
		}
	};

	return {
		handleCheckInUsers,
		isCheckingIn: checkInMutation.isPending,
		checkInError: checkInMutation.error,
	};
};
