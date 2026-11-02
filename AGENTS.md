<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project rules

- All pages live under `src/routes/$lang.*` (es/en); copy goes in `src/lib/i18n.ts` with identical shape for both languages — keeps the site fully bilingual.
- Creator profiles come only from `src/data/talents.ts`; add a creator there and cards, profile pages, form options and sitemap update automatically.
- Featured videos and supporting public sources belong to each talent record; the shared gallery loads third-party players only on play and always offers the original post, keeping all profiles consistent without automatic third-party requests.
- Store new exact metrics as numbers with optional percentage format, and audience provenance/precision in talent data; locale formatting belongs in display helpers so bilingual views retain the same values.
- Contact data (email, WhatsApp, LinkedIn) lives only in `src/data/site.ts` so links stay consistent.
- Form submissions insert into insert-only tables (`brand_inquiries`, `creator_applications`); success is shown only after the insert succeeds.
