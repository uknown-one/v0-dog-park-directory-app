import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Phone, Globe, Mail, AlertCircle, CheckCircle } from "lucide-react"

interface ParkInfoProps {
  park: {
    description: string
    address: string
    city: string
    state: string
    zipCode: string
    hours?: Record<string, string>
    contact?: {
      phone?: string
      email?: string
      website?: string
    }
    rules?: string[]
  }
}

export function ParkInfo({ park }: ParkInfoProps) {
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About This Park</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-pretty">{park.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium text-foreground mb-1">Address</div>
              <div className="text-muted-foreground">
                {park.address}
                <br />
                {park.city}, {park.state} {park.zipCode}
              </div>
            </div>

            {park.contact && (
              <>
                <Separator />
                <div className="space-y-3">
                  {park.contact.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{park.contact.phone}</span>
                    </div>
                  )}

                  {park.contact.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">{park.contact.email}</span>
                    </div>
                  )}

                  {park.contact.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={park.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {park.hours && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(park.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium text-foreground">{formatDay(day)}</span>
                    <span className="text-muted-foreground">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {park.rules && park.rules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Park Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {park.rules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
