import { useState } from 'react';
import { Mail, Send, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.'
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.'
  })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle form submission (in a real app, this would send data to a server)
    console.log('Form data:', data);
    
    toast({
      title: 'Message Sent!',
      description: 'Thanks for reaching out. I\'ll get back to you soon.',
      variant: 'default'
    });
    
    // Reset form
    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-primary/10 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        {...register('name')}
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="your.email@example.com"
                        type="email"
                        {...register('email')}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      {...register('subject')}
                      className={errors.subject ? 'border-destructive' : ''}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={6}
                      {...register('message')}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-primary/10 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">
                        San Francisco, California
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Response Time</h4>
                      <p className="text-muted-foreground">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Preferred Contact Methods</h3>
                
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Email:</span> Best for detailed inquiries
                  </p>
                  <p>
                    <span className="font-medium text-foreground">LinkedIn:</span> Great for professional connections
                  </p>
                  <p>
                    <span className="font-medium text-foreground">GitHub:</span> For code-related discussions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}