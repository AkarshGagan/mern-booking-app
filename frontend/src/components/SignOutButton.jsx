import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: signOut,
    onSuccessb: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Loggedout successully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Unable to logout ", type: "Error" });
    },
  });

  function handleMutate() {
    mutation.mutate();
  }
  return (
    <button
      onClick={handleMutate}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-slate-200"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
