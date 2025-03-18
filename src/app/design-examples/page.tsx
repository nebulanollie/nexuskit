"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { CardWithStats } from "@/components/ui/card-with-stats"
import { ThemeSwitch } from "@/components/ui/theme-switch"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  Users, 
  Calendar, 
  BarChart3,
  ShoppingBag,
  Activity,
  Eye,
  LineChart,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DesignExamplesPage() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-sticky p-4 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center">
        <h1 className="text-xl font-semibold">Design Examples</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/design-system">View Design System</a>
          </Button>
          <ThemeSwitch />
        </div>
      </div>
      
      <Section>
        <Container>
          <div className="space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Dashboard Example</h1>
              <p className="text-muted-foreground">
                A demonstration of design system components in a real-world context.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                  <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                  <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <CardWithStats 
                    title="Business Overview"
                    description="Performance metrics for the current month"
                    stats={[
                      {
                        title: "Total Revenue",
                        value: "$24,532",
                        change: 12.5,
                        description: "Compared to last month",
                        icon: <DollarSign className="h-4 w-4" />
                      },
                      {
                        title: "New Customers",
                        value: "1,243",
                        change: 5.3,
                        description: "Compared to last month",
                        icon: <Users className="h-4 w-4" />
                      },
                      {
                        title: "Active Subscriptions",
                        value: "3,845",
                        change: -2.1,
                        description: "Compared to last month",
                        icon: <Calendar className="h-4 w-4" />
                      },
                      {
                        title: "Conversion Rate",
                        value: "3.2%",
                        change: 0,
                        description: "Compared to last month",
                        icon: <BarChart3 className="h-4 w-4" />
                      }
                    ]}
                    footer={
                      <div className="flex justify-between items-center w-full">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                        <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
                      </div>
                    }
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardWithStats 
                title="Sales Overview"
                stats={[
                  {
                    title: "Total Orders",
                    value: "1,324",
                    change: 8.2,
                    icon: <ShoppingBag className="h-4 w-4" />
                  },
                  {
                    title: "Average Order Value",
                    value: "$85.32",
                    change: 3.5,
                    icon: <DollarSign className="h-4 w-4" />
                  },
                ]}
              />
              
              <CardWithStats 
                title="Website Performance"
                stats={[
                  {
                    title: "Total Visits",
                    value: "32,594",
                    change: 15.3,
                    icon: <Activity className="h-4 w-4" />
                  },
                  {
                    title: "Unique Visitors",
                    value: "24,123",
                    change: 9.8,
                    icon: <Eye className="h-4 w-4" />
                  },
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CardWithStats 
                title="Weekly Orders"
                variant="primary"
                stats={[
                  {
                    title: "Orders",
                    value: "432",
                    change: 4.3,
                    icon: <LineChart className="h-4 w-4" />
                  },
                ]}
              />
              
              <CardWithStats 
                title="Monthly Orders"
                variant="secondary"
                stats={[
                  {
                    title: "Orders",
                    value: "1,563",
                    change: 8.1,
                    icon: <TrendingUp className="h-4 w-4" />
                  },
                ]}
              />
              
              <CardWithStats 
                title="Quarterly Orders"
                variant="accent"
                stats={[
                  {
                    title: "Orders",
                    value: "4,892",
                    change: 12.5,
                    icon: <BarChart3 className="h-4 w-4" />
                  },
                ]}
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Alerts & Notifications</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational message.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This is an error message.
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-[--color-success] text-[--color-success-foreground]">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    This is a success message.
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-[--color-warning] text-[--color-warning-foreground]">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This is a warning message.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Badges & Labels</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      Subscription Status
                      <Badge>Active</Badge>
                    </CardTitle>
                    <CardDescription>
                      Current subscription details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Plan</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Professional</Badge>
                            <Badge variant="secondary">Annual</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Status</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="default">Active</Badge>
                            <Badge variant="outline">Auto-renew ON</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Usage</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[--color-success]">72% utilized</Badge>
                            <Badge variant="outline">28% remaining</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">Manage Plan</Button>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Renews in 45 days</Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
} 