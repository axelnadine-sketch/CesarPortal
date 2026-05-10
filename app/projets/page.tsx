import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getActiveProjects } from "@/lib/project-repository";

export default async function ProjectsPage() {
  const projects = await getActiveProjects();

  return (
    <main className="pb-20 pt-8 text-neutral-100">
      <Container>
        <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] px-6 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.28)] md:px-10 md:py-14">
          <Badge>Projets CZR</Badge>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Centre de pilotage des projets
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">
            Suivi simple des projets actifs, de leur priorité et de la prochaine action à réaliser.
          </p>
        </section>

        <section className="mt-10">
          {projects.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6"
                  key={project.id}
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge>{project.status}</Badge>
                    <Badge>{project.priority}</Badge>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold text-white">{project.name}</h2>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {project.shortDescription}
                  </p>

                  {project.nextAction ? (
                    <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                        Prochaine action
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/70">{project.nextAction}</p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/[0.03] p-8 text-center text-sm text-white/60">
              Aucun projet actif pour le moment.
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
