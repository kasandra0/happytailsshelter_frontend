import { useContext, useState } from "react";
import { GlobalContext } from "@/hooks/GlobalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ADMIN_ROLE, FOSTER_PARENT_ROLE } from "@/types/types";
import { User } from "lucide-react";
import { USER_STATUS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal/modal";
import { EditProfileForm, type EditProfileFormValues } from "@/components/form/editProfileForm";
import { updateUser } from "@/services/userService";

const ROLE_LABELS: Record<number, string> = {
  [FOSTER_PARENT_ROLE]: "Foster Parent",
  [ADMIN_ROLE]: "Administrator",
};

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export default function MyFosterProfilePage() {
  const { user, setUser } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-center font-bold">My Profile</h1>
        <p className="text-center text-muted-foreground mt-4">Loading profile...</p>
      </div>
    );
  }

  const handleSubmit = async (data: EditProfileFormValues) => {
    const updatedUser = await updateUser(user.user_id, data);
    setUser(updatedUser);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Card className="max-w-lg">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="rounded-full bg-muted p-3 text-muted-foreground">
            <User className="h-6 w-6" />
          </div>
          <CardTitle>
            {user.first_name} {user.last_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pt-2">
          <ProfileRow label="Role" value={ROLE_LABELS[user.role] ?? `Role ${user.role}`} />
          <ProfileRow label="Email" value={user.email} />
          <ProfileRow label="Phone Number" value={user.phone_number || "--"} />
          <ProfileRow label="Foster Parent Status" value={USER_STATUS[user.status]} />
          <Button variant="outline" className="mt-2 self-start" onClick={() => setModalOpen(true)}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Edit Profile"
        component={modalOpen && <EditProfileForm user={user} onSubmit={handleSubmit} />}
        onCancel={() => setModalOpen(false)}
        form="edit-profile-form"
      />
    </div>
  );
}
