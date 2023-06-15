import { actorCreationDTO } from "../actors/actors.model";
import { movieCreationDTO } from "../movies/movies.model";

export function convertActorToFormData(actor: actorCreationDTO): FormData {
  const formData = new FormData();

  formData.append("name", actor.name);
  if (actor.biography) {
    formData.append("biography", actor.biography);
  }
  if (actor.dateOfBirth) {
    formData.append("dateOfBirth", formatDate(actor.dateOfBirth));
  }
  if (actor.picture) {
    formData.append("picture", actor.picture);
  }
  return formData;
}

export function convertMovieToFormData(movie: movieCreationDTO): FormData {
  const formData = new FormData();

  formData.append("title", movie.title);
  formData.append("trailer", movie.trailer);
  formData.append("inTheaters", String(movie.inTheaters));
  formData.append("genresIds", JSON.stringify(movie.genresIds));
  formData.append("movieTheatersIds", JSON.stringify(movie.movieTheatersIds));
  formData.append("actors", JSON.stringify(movie.actors));
  if (movie.summary) formData.append("summary", movie.summary);
  if (movie.releaseDate)
    formData.append("releaseDate", formatDate(movie.releaseDate));
  if (movie.poster) formData.append("poster", movie.poster);
  return formData;
}

function formatDate(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(date);
  return `${year}-${month}-${day}`;
}
