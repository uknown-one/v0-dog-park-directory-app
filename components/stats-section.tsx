export function StatsSection() {
  const stats = [
    {
      number: "1,200+",
      label: "Dog Parks Listed",
      description: "Comprehensive directory of parks across the country",
    },
    {
      number: "50,000+",
      label: "Happy Dogs",
      description: "Dogs that have found their perfect play spot",
    },
    {
      number: "25,000+",
      label: "Community Reviews",
      description: "Real reviews from real dog owners",
    },
    {
      number: "500+",
      label: "Cities Covered",
      description: "Parks in major cities and small towns alike",
    },
  ]

  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Trusted by Dog Owners Everywhere</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join thousands of dog owners who use PawParks to find the best places to play
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
