<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookRepository")
 * @ApiResource(
 *     attributes={"order": {"id": "DESC"}},
 *     normalizationContext={"groups": {"book_read"}},
 *     itemOperations={"GET", "PUT", "DELETE"},
 *     collectionOperations={"GET", "POST"},
 *     subresourceOperations={
 *          "scores_get_subresource"={
 *              "path" = "/books/{id}/scores"
 *          }
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"title": "partial", "scores.score"})
 */
class Book
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"book_read", "score_read"})
     */
    private $id;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255), nullable=false)
     * @Groups({"book_read", "score_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("book_read")
     */
    private $summary;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"book_read", "score_read"})
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Score", mappedBy="book", orphanRemoval=true)
     * @ApiSubresource()
     * @Groups("book_read")
     */
    private $scores;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="books")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("book_read")
     */
    private $user;

    public function __construct()
    {
        $this->scores = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|Score[]
     */
    public function getScores(): Collection
    {
        return $this->scores;
    }

    public function addScore(Score $score): self
    {
        if (!$this->scores->contains($score)) {
            $this->scores[] = $score;
            $score->setBook($this);
        }

        return $this;
    }

    public function removeScore(Score $score): self
    {
        if ($this->scores->contains($score)) {
            $this->scores->removeElement($score);
            // set the owning side to null (unless already changed)
            if ($score->getBook() === $this) {
                $score->setBook(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
