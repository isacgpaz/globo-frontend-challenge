import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";
import { useBlockUser } from "@/modules/users/block-user";
import { useEnableUser } from "@/modules/users/enable-user";
import { User, UserStatus } from "@/types/user";
import { Ban, Check } from "lucide-react";

export function UsersTable({ data }: { data: User[] }) {
  const { mutate: enableUser, isPending: isEnableUserPending } = useEnableUser()
  const { mutate: blockUser, isPending: isBlockUserPending } = useBlockUser()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.status === UserStatus.ENABLED ? (
                <Button
                  size='icon'
                  variant='link'
                  className="text-destructive"
                  onClick={() => blockUser({ userId: user.id }, {
                    onSuccess() {
                      toast({
                        description: 'Usuário bloqueado com sucesso.',
                        variant: 'success'
                      })

                      queryClient.invalidateQueries({
                        queryKey: ['users']
                      })
                    }
                  })}
                  isLoading={isBlockUserPending}
                >
                  <Ban className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  size='icon'
                  variant='link'
                  className="text-emerald-500"
                  onClick={() => enableUser({ userId: user.id }, {
                    onSuccess() {
                      toast({
                        description: 'Usuário desbloqueado com sucesso.',
                        variant: 'success'
                      })

                      queryClient.invalidateQueries({
                        queryKey: ['users']
                      })
                    }
                  })}
                  isLoading={isEnableUserPending}
                >
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}