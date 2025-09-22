import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export function ParkMap() {
  return (
    <Card className="h-96">
      <CardContent className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Google Maps integration will be added to show park locations with pins and directions.
          </p>
          <Button variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Enable Location Services
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
