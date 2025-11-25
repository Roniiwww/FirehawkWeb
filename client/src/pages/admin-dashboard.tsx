import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ContactMessage } from "@shared/schema";
import { 
  Plane, 
  LogOut, 
  Mail, 
  CheckCircle, 
  Clock,
  MessageSquare,
  Send
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [reply, setReply] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
  });

  const replyMutation = useMutation({
    mutationFn: async ({ id, reply }: { id: string; reply: string }) => {
      return await apiRequest("POST", `/api/contact/${id}/reply`, { reply });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Reply sent",
        description: "Your response has been recorded",
      });
      setSelectedMessage(null);
      setReply("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setLocation("/admin");
  };

  const handleReply = () => {
    if (selectedMessage && reply.trim()) {
      replyMutation.mutate({ id: selectedMessage.id, reply });
    }
  };

  const newMessages = messages?.filter(m => m.status === "new").length || 0;
  const repliedMessages = messages?.filter(m => m.status === "replied").length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Plane className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Firehawk Admin</h1>
                <p className="text-sm text-muted-foreground">Message Management</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                  <p className="text-3xl font-bold">{messages?.length || 0}</p>
                </div>
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Replies</p>
                  <p className="text-3xl font-bold">{newMessages}</p>
                </div>
                <Clock className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Replied</p>
                  <p className="text-3xl font-bold">{repliedMessages}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
            <CardDescription>
              View and respond to messages from visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading messages...
              </div>
            ) : !messages || messages.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card 
                    key={message.id} 
                    className="p-6 hover-elevate cursor-pointer"
                    onClick={() => setSelectedMessage(message)}
                    data-testid={`message-${message.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{message.name}</h3>
                          <Badge variant={message.status === "new" ? "default" : "secondary"}>
                            {message.status === "new" ? "New" : "Replied"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                        <p className="font-medium mb-2">{message.subject}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(message.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(message);
                        }}
                        data-testid={`button-reply-${message.id}`}
                      >
                        {message.status === "new" ? "Reply" : "View"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              View message and send a response
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6">
              <div className="space-y-4 pb-6 border-b border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">From</Label>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Subject</Label>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Message</Label>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Received</Label>
                  <p className="text-sm">{format(new Date(selectedMessage.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
                </div>
              </div>

              {selectedMessage.status === "replied" && selectedMessage.reply ? (
                <div className="bg-muted p-4 rounded-lg">
                  <Label className="text-xs text-muted-foreground">Your Reply</Label>
                  <p className="text-sm mt-2 whitespace-pre-wrap">{selectedMessage.reply}</p>
                  {selectedMessage.repliedAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Sent on {format(new Date(selectedMessage.repliedAt), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reply">Your Reply</Label>
                    <Textarea
                      id="reply"
                      placeholder="Type your response here..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="min-h-32 mt-2"
                      data-testid="input-reply"
                    />
                  </div>
                  <Button 
                    onClick={handleReply}
                    disabled={!reply.trim() || replyMutation.isPending}
                    className="w-full"
                    data-testid="button-send-reply"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {replyMutation.isPending ? "Sending..." : "Send Reply"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
