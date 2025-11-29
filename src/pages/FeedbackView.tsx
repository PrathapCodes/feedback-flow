import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestFeedback } from "@/services/feedbackService";
import { Feedback } from "@/types/feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Mail, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const FeedbackView = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const result = await getLatestFeedback(10);
        if (result.success) {
          setFeedback(result.items);
        }
      } catch (error) {
        console.error("Failed to load feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Feedback Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Recent student feedback and course reviews
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : feedback.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No feedback yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                Be the first to share your thoughts!
              </p>
              <Link to="/">
                <Button>Submit First Feedback</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {feedback.length} {feedback.length === 1 ? "entry" : "entries"}
              </p>
            </div>

            {feedback.map((item) => (
              <Card key={item.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {item.name}
                        <Badge variant="secondary" className="font-normal">
                          {item.course}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        {item.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {item.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(item.submitted_at), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {renderStars(item.rating)}
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.rating}.0 / 5.0
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{item.comments}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;
