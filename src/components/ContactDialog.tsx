import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactDialogProps {
  children: React.ReactNode;
  description?: string;
}

export const ContactDialog = ({ children, description = "Interested in sponsoring or partnering? Fill out the form and we'll be in touch." }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value.trim() || null,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    const { error } = await supabase.from("contact_submissions").insert(formData);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    // Try to send email notification (non-blocking)
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          recipientEmail: "agata.braja@polsv.org",
          idempotencyKey: `contact-notify-${Date.now()}`,
          templateData: { name: formData.name, email: formData.email, organization: formData.organization, message: formData.message },
        },
      });
    } catch {
      // Email failure shouldn't block submission
    }

    setIsSubmitting(false);
    setOpen(false);
    form.reset();
    toast({ title: "Message sent", description: "We'll get back to you shortly." });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Contact Us</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" required maxLength={100} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-org">Organization</Label>
            <Input id="contact-org" name="organization" maxLength={150} placeholder="Your organization" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" name="message" required maxLength={1000} placeholder="Tell us about your interest…" rows={4} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
