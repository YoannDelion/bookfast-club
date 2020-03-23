<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ScoreRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "api_books_scores_get_subresource"={
 *              "normalization_context"={"groups"={"scores_subresource"}}
 *          }
 *     },
 *     attributes = {
 *          "order" = {"createdAt": "DESC"},
 *     },
 *     itemOperations={"GET", "PUT", "DELETE"},
 *     collectionOperations={"GET", "POST"},
 *     normalizationContext={"groups": "score_read"},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Score
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"scores_subresource", "book_read", "score_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups("scores_subresource")
     * @Assert\NotBlank
     * @Groups({"scores_subresource", "book_read", "score_read"})
     */
    private $score;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"scores_subresource", "book_read", "score_read"})
     */
    private $comment;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("scores_subresource")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("scores_subresource")
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("scores_subresource")
     */
    private $deletedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("scores_subresource")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Book", inversedBy="scores")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("score_read")
     */
    private $book;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore($score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeInterface
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeInterface $deletedAt): self
    {
        $this->deletedAt = $deletedAt;

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

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book): self
    {
        $this->book = $book;

        return $this;
    }
}
