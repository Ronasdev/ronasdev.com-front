import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommentContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: {
    id: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
    };
    post: {
      title: string;
      type: "article" | "formation";
      content: string;
    };
    date: string;
  };
}

export function CommentContextDialog({
  open,
  onOpenChange,
  comment,
}: CommentContextDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Contexte du commentaire</DialogTitle>
          <DialogDescription>
            Commentaire de {comment.author.name} sur {comment.post.title}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="mb-2 font-medium">Contenu de l'article/formation</h4>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: comment.post.content }}
              />
            </ScrollArea>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Commentaire</h4>
            <div className="rounded-md border p-4">
              <p className="text-sm">{comment.content}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Publié le {new Date(comment.date).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
